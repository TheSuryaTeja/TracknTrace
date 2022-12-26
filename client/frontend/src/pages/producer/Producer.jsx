import MyAccordian from "../../components/MyAccordian";
import CreateForm from "../../components/CreateForm";
import ReadForm from "../../components/ReadForm";
import TransferForm from "../../components/TransferForm";
import DeleteForm from "../../components/DeleteForm";
import ReadOrder from "../../components/ReadOrder";
import HistoryForm from "../../components/HistoryForm";

export default function Producer() {
  return (
    <div>
      <MyAccordian label="Create Product" Component={CreateForm} />
      <MyAccordian label="Read Product" Component={ReadForm} />
      <MyAccordian label="Transfer Product" Component={TransferForm} />
      <MyAccordian label="Delete Product" Component={DeleteForm} />
      <MyAccordian label="Read Order" Component={ReadOrder} />
      <MyAccordian label="Get Product History" Component={HistoryForm} />
    </div>
  );
}
