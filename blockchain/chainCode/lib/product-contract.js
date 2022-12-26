/*
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const { Contract } = require("fabric-contract-api");

class ProductContract extends Contract {
    async productExists(ctx, productId) {
        const buffer = await ctx.stub.getState(productId);
        return !!buffer && buffer.length > 0;
    }

    async createProduct(
        ctx,
        productId,
        productType,
        productName,
        producerName,
        dom
    ) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID === "producer-tnt-com") {
            const exists = await this.productExists(ctx, productId);
            if (exists) {
                throw new Error(`The product ${productId} already exists`);
            }
            const data = {
                productId,
                productType,
                productName,
                dom,
                producerName,
                owner: mspID,
                assetType: "product",
            };
            const buffer = Buffer.from(JSON.stringify(data));
            await ctx.stub.putState(productId, buffer);
            let addProductEventData = { Type: "Product creation", ...data };
            await ctx.stub.setEvent(
                "addProductEvent",
                Buffer.from(JSON.stringify(addProductEventData))
            );
        } else {
            throw new Error(
                `This user ${mspID} is not able to perform this action`
            );
        }
    }

    async readProduct(ctx, productId) {
        const exists = await this.productExists(ctx, productId);
        if (!exists) {
            throw new Error(`The product ${productId} does not exist`);
        }
        const buffer = await ctx.stub.getState(productId);
        const data = JSON.parse(buffer.toString());
        return data;
    }

    async transferProduct(ctx, productId, newOwner) {
        const buffer = await ctx.stub.getState(productId);
        const asset = JSON.parse(buffer.toString());
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID === asset.owner) {
            const exists = await this.productExists(ctx, productId);
            if (!exists) {
                throw new Error(`The product ${productId} does not exist`);
            }
            asset.owner = newOwner;
            const buffer = Buffer.from(JSON.stringify(asset));
            await ctx.stub.putState(productId, buffer);
        } else {
            throw new Error(
                `This user ${mspID} is not able to perform this action`
            );
        }
    }

    async deleteProduct(ctx, productId) {
        const exists = await this.productExists(ctx, productId);
        if (!exists) {
            throw new Error(`The product ${productId} does not exist`);
        }
        await ctx.stub.deleteState(productId);
    }

    async queryAllProducts(ctx) {
        const queryString = {
            selector: {
                assetType: "product",
            },
            sort: [{ dom: "asc" }],
        };
        let resultIterator = await ctx.stub.getQueryResult(
            JSON.stringify(queryString)
        );
        let result = await this.getAllResults(resultIterator);
        return JSON.stringify(result);
    }

    async getProductHistory(ctx, productId) {
        let resultIterator = await ctx.stub.getHistoryForKey(productId);
        let result = await this.getAllResults(resultIterator, true);
        return JSON.stringify(result);
    }

    async getAllResults(iterator, isHistory) {
        let allResult = [];

        for (
            let res = await iterator.next();
            !res.done;
            res = await iterator.next()
        ) {
            if (res.value && res.value.value.toString()) {
                let jsonRes = {};
                if (isHistory && isHistory == true) {
                    jsonRes.TxId = res.value.txId;
                    jsonRes.timestamp = res.value.timestamp;
                    jsonRes.Record = JSON.parse(res.value.value.toString());
                } else {
                    jsonRes.Key = res.value.key;
                    jsonRes.Record = JSON.parse(res.value.value.toString());
                }

                allResult.push(jsonRes);
            }
        }
        await iterator.close();
        return allResult;
    }

    async getProductsWithPagination(ctx, _pageSize, _bookMark) {
        const queryString = {
            selector: {
                assetType: "product",
            },
        };
        const pageSize = parseInt(_pageSize, 10);
        const bookMark = _bookMark;
        const { iterator, metadata } =
            await ctx.stub.getQueryResultWithPagination(
                JSON.stringify(queryString),
                pageSize,
                bookMark
            );
        let result = await this.getAllResults(iterator, false);
        let results = {};
        results.Result = result;
        results.ResponseMetaData = {
            RecordCount: metadata.feached_records_count,
            Bookmark: metadata.bookmark,
        };
        return JSON.stringify(results);
    }
}

module.exports = ProductContract;
