import { Checkbox, Flex, Tag, Tooltip, Typography } from "antd";
import { InfoOutlined, GlobalOutlined, FlagOutlined } from "@ant-design/icons";
import "./style.css";
import { BookIcon, PersonIcon } from "../ui/CastomIcon";
import Storage from "../Storage/Storage";
const { Link, Text } = Typography;

const NewsHeadline = ({ db, wholeNews = false }) => {
  const { day, mountYaer } = Storage.getDate(db.DP);
  const arr = Storage.getPercentage(db.TRAFFIC);

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <Flex vertical gap="small">
      <Flex gap="large">
        <Text>
          {wholeNews ? <span className="light-text">{day}</span> : day}
          {mountYaer}
        </Text>

        <Text>
          <span className="light-text">
            {db.REACH} {!wholeNews && "Top Reach"}
          </span>{" "}
          {wholeNews && "Reach"}
        </Text>

        {wholeNews && (
          <Flex gap="small">
            <Text>Top Traffic:</Text>

            {arr.map((el, i) => (
              <Text key={i}>
                {el.value} <span className="light-text">{el.count}</span>
              </Text>
            ))}
          </Flex>
        )}

        <Flex gap="small" align="center" style={{ marginLeft: "auto" }}>
          <Tag
            color={db.SENT === "negative" ? "#f5222d" : "#a0d911"}
            className="mark"
          >
            {Storage.getFormattedString(db.SENT)}
          </Tag>

          <Tooltip title="Какая-то информация">
            <InfoOutlined className="info" />
          </Tooltip>

          <Checkbox onChange={onChange} />
        </Flex>
      </Flex>

      <Link href={db.URL} target="_blank" className="title">
        {db.TI}
      </Link>

      <Flex>
        <Flex gap="large">
          <Link className="wrap-svg link">
            <GlobalOutlined />
            {db.DOM}
          </Link>

          <Text className="wrap-svg">
            <FlagOutlined />
            {db.CNTR}
          </Text>

          {db.CNTR_CODE !== "" && (
            <Text className="wrap-svg">
              <BookIcon />
              {Storage.getFormattedString(db.CNTR_CODE)}
            </Text>
          )}

          {db.AU.length !== 0 && (
            <Text className="wrap-svg">
              <PersonIcon />
              {db.AU.map((el) => Storage.getFormattedString(el))}
            </Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NewsHeadline;
