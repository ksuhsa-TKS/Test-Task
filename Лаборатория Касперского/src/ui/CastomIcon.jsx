import Icon from "@ant-design/icons";

const BookSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M2 6s1.5-2 5-2s5 2 5 2v14s-1.5-1-5-1s-5 1-5 1zm10 0s1.5-2 5-2s5 2 5 2v14s-1.5-1-5-1s-5 1-5 1z"
    />
  </svg>
);

const PersonSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g fill="none" strokeWidth="2">
      <circle cx="12" cy="7" r="5" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 14h.352a3 3 0 0 1 2.976 2.628l.391 3.124A2 2 0 0 1 18.734 22H5.266a2 2 0 0 1-1.985-2.248l.39-3.124A3 3 0 0 1 6.649 14H7"
      />
    </g>
  </svg>
);

export const BookIcon = (props) => <Icon component={BookSvg} {...props} />;
export const PersonIcon = (props) => <Icon component={PersonSvg} {...props} />;
