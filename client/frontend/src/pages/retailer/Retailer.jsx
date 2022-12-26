import MyAccordian from "../../components/MyAccordian";
import ReadForm from "../../components/ReadForm";
import HistoryForm from "../../components/HistoryForm";

export default function Retailer() {
  return (
    <div>
      <MyAccordian label="Read Product" Component={ReadForm} />
      <MyAccordian label="Get Product History" Component={HistoryForm} />
    </div>
  );
}
