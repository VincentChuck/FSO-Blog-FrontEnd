import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notifications);
  return notification.content === null ? null : (
    <div className={notification.type}>{notification.content}</div>
  );
};

export default Notification;
