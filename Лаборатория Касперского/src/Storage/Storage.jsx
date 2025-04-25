import { makeAutoObservable } from "mobx";

class Storage {
  constructor() {
    makeAutoObservable(this);
  }

  defaultValueMenu = "By Relevance";
  listMenu = [
    {
      label: "By Relevance",
      key: "1",
    },
    {
      label: "By Popularity",
      key: "2",
    },
    {
      label: "By Novelty",
      key: "3",
    },
  ];

  onClickMenu = ({ key }) => {
    return (this.defaultValueMenu = this.listMenu[Number(key) - 1].label);
  };

  getDate = (value) => {
    const date = new Date(value);
    const day = date.getDate();
    const mountYaer = ` ${date.toLocaleString("en-US", {
      month: "long",
    })} ${date.getFullYear()}`;

    return { day, mountYaer };
  };

  getPercentage = (arr) => {
    return arr.map((el) => {
      typeof el.count === "number" &&
        (el.count = `${(el.count * 100).toFixed(1)}%`);
      return el;
    });
  };

  getFormattedString = (value) => {
    return value
      .split(" ")
      .map((el) => {
        const first = el[0].toUpperCase();
        const other = el.slice(1).toLowerCase();
        return (el = `${first}${other}`);
      })
      .join(" ");
  };
}

export default new Storage();
