import MyAccordian from "../../components/MyAccordian";
import ReadForm from "../../components/ReadForm";
import TransferForm from "../../components/TransferForm";
import CreateOrder from "../../components/CreateOrder";
import ReadOrder from "../../components/ReadOrder";
import HistoryForm from "../../components/HistoryForm";

export default function Producer() {
  return (
    <div>
      <MyAccordian label="Read Product" Component={ReadForm} />
      <MyAccordian label="Transfer Product" Component={TransferForm} />
      <MyAccordian label="Create Order" Component={CreateOrder} />
      <MyAccordian label="Read Order" Component={ReadOrder} />
      <MyAccordian label="Get Product History" Component={HistoryForm} />
    </div>
  );
}
