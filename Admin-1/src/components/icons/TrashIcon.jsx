import IconWrapper from "./IconWrapper";

export default function TrashIcon(props) {
  return (
    <IconWrapper {...props}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6m4-6v6" />
      <path d="M9 6V4h6v2" />
    </IconWrapper>
  );
}