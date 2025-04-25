import { Card, ConfigProvider, Flex, Statistic, Typography } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import "./style.css";
import { styleTheme } from "./styleTheme.js";
import NewsHeadline from "./NewsHeadline";
import DuplicateNews from "./DuplicateNews.jsx";

const { Paragraph } = Typography;

const CardNews = ({ db }) => {
  return (
    <ConfigProvider theme={styleTheme}>
      <Card>
        <Flex vertical gap="small">
          <NewsHeadline db={db} wholeNews={true} />

          <Paragraph
            className="description"
            type="secondary"
            ellipsis={{
              rows: 3,
              expandable: true,
              symbol: () => (
                <>
                  Show more <CaretDownOutlined />
                </>
              ),
            }}
          >
            {db.HIGHLIGHTS}
          </Paragraph>

          <Paragraph
            className="keywords"
            ellipsis={{
              rows: 1,
              expandable: true,
              symbol: () => <>Show All +{db.KW.length}</>,
            }}
          >
            {db.KW.map((el, i) => (
              <>
                <Statistic
                  title={el.value}
                  value={el.count}
                  key={i}
                  className="statistic keyword"
                />{" "}
              </>
            ))}
          </Paragraph>

          <DuplicateNews db={db} />
        </Flex>
      </Card>
    </ConfigProvider>
  );
};

export default CardNews;
