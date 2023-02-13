export const cls = (...classnames: string[]) => {
  return classnames.join(" ");
};

export const colors = {
  primaryColor: "red-500",
  bgColor: "bg-red-500",
  secondary: "text-white",
};

export const convertTimeIntl = (time: string) => {
  return new Intl.DateTimeFormat("ko-kr", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Seoul",
  }).format(new Date(time));
};

export const convertTime = (value: string) => {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return "방금 전";
  if (betweenTime < 60) {
    return `${betweenTime}분 전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간 전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일 전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년 전`;
};

export const calculateEnterTime = (createdAt: string) => {
  const now = new Date();
  const enterTime = new Date(createdAt);
  const diff = now.getTime() - enterTime.getTime();
  const hour = Math.floor(diff / (1000 * 60 * 60));
  const min = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  // const sec = Math.floor((diff % (1000 * 60)) / 1000);

  return `${hour}시간 ${min}분`;
};
