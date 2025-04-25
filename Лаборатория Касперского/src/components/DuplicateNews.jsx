import { Button, Card, Flex, Statistic } from "antd";
import Link from "antd/es/typography/Link";
import { DownOutlined } from "@ant-design/icons";
import DropDownMenu from "./DropDownMenu";
import NewsHeadline from "./NewsHeadline";
import "./style.css";

const DuplicateNews = ({ db }) => {
  return (
    <Flex vertical gap="middle">
      <Link href={db.URL} className="main-link">
        Original Source
      </Link>

      <Flex justify="space-between" align="center">
        <Statistic title="Duplicares:" value={0} className="statistic" />

        <DropDownMenu />
      </Flex>

      <Card size="small" className="min-card">
        <NewsHeadline db={db} />
      </Card>

      <Button>
        <DownOutlined />
        View Duplicates
      </Button>
    </Flex>
  );
};

export default DuplicateNews;
