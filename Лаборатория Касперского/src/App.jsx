import "@ant-design/v5-patch-for-react-19";
import db from "../db.json";
import CardNews from "./components/CardNews";
import { Flex } from "antd";

function App() {
  return (
    <Flex vertical gap="40px">
      <CardNews db={db} />
    </Flex>
  );
}

export default App;
