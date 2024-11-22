import iconMap from "./icons";

const stackMap = ({ stack }: { stack: string }) => {
  const stackArray = stack.split(",").map((stack) => stack.trim());

  const stackIcons = stackArray.map((stack) => ({
    name: stack,
    icon: iconMap[stack as keyof typeof iconMap] || <span>?</span>,
  }));
  return stackIcons;
};
export default stackMap;
