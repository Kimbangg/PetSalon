const calcElapsedTime = ({ createdAt }) => {
  if (!createdAt) {
    return null;
  }

  const priorDate = new Date(createdAt);
  const currentDate = new Date();
  const elapsedMsec = currentDate.getTime() - priorDate.getTime();
  const elapsedSec = Math.floor(elapsedMsec / 1000);

  if (elapsedSec < 60) {
    return `${elapsedSec}초 전`;
  }

  const elapsedMin = Math.floor(elapsedSec / 60);

  if (elapsedMin < 60) {
    return `${elapsedMin}분 전`;
  }

  const elapsedHourInteger = Math.floor(elapsedMin / 60);

  if (elapsedHourInteger >= 24) {
    const elapsedDays = Math.floor(elapsedHourInteger / 24);
    return `${elapsedDays}일 전`;
  }

  const elapsedMinInteger = elapsedMin - elapsedHourInteger * 60;

  return `${elapsedHourInteger}시간 ${elapsedMinInteger}분 전`;
};

export default calcElapsedTime;
