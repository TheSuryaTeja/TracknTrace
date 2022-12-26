import MyAccordian from "../../components/MyAccordian";
import ReadForm from "../../components/ReadForm";
import TransferForm from "../../components/TransferForm";
import HistoryForm from "../../components/HistoryForm";

export default function Supplier() {
  return (
    <div>
      <MyAccordian label="Read Product" Component={ReadForm} />
      <MyAccordian label="Transfer Product" Component={TransferForm} />
      <MyAccordian label="Get Product History" Component={HistoryForm} />
    </div>
  );
}
