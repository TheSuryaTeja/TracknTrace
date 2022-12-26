/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

async function getCollectionName(ctx) {
    const collectionName = 'CollectionOrder';
    return collectionName;
}

class OrderContract extends Contract {

    async orderExists(ctx, orderId) {
        const collectionName = await getCollectionName(ctx);
        const data = await ctx.stub.getPrivateDataHash(collectionName, orderId);
        return (!!data && data.length > 0);
    }

    async createOrder(ctx, orderId) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID === 'wholesaler-tnt-com') {
            const exists = await this.orderExists(ctx, orderId);
            if (exists) {
                throw new Error(`The asset order ${orderId} already exists`);
            }

            const orderAsset = {};

            const transientData = ctx.stub.getTransient();
            if (transientData.size === 0 ||
                !transientData.has('productName') ||
                !transientData.has('productType') ||
                !transientData.has('producerName') ||
                !transientData.has('dom')) {
                throw new Error('The private data was not specified in transient data. Please try again.');
            }
            orderAsset.productName = transientData.get('productName').toString();
            orderAsset.productType = transientData.get('productType').toString();
            orderAsset.producerName = transientData.get('producerName').toString();
            orderAsset.dom = transientData.get('dom').toString();
            orderAsset.assetType = 'order'

            const collectionName = await getCollectionName(ctx);
            await ctx.stub.putPrivateData(collectionName, orderId, Buffer.from(JSON.stringify(orderAsset)));
        }

        else {
            return `User under the following MSP: ${mspID} cannot perform this action`
        }

    }

    async readOrder(ctx, orderId) {
        const exists = await this.orderExists(ctx, orderId);
        if (!exists) {
            throw new Error(`The asset order ${orderId} does not exist`);
        }
        let privateDataString;
        const collectionName = await getCollectionName(ctx);
        const privateData = await ctx.stub.getPrivateData(collectionName, orderId);
        privateDataString = JSON.parse(privateData.toString());
        return privateDataString;
    }

    async deleteOrder(ctx, orderId) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID === 'dealer-auto-com') {
            const exists = await this.orderExists(ctx, orderId);
            if (!exists) {
                throw new Error(`The asset order ${orderId} does not exist`);
            }
            const collectionName = await getCollectionName(ctx);
            await ctx.stub.deletePrivateData(collectionName, orderId);
        }

        else {
            return `User under the following MSP: ${mspID} cannot perform this action`
        }
    }

}

module.exports = OrderContract;
