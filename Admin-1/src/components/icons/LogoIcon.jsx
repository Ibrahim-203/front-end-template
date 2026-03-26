import IconWrapper from "./IconWrapper";

export default function LogoIcon(props) {
  return (
    <IconWrapper {...props}>
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
    </IconWrapper>
  );
}