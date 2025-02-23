import { MdWarningAmber } from "react-icons/md";

const WebViewNotice = () => {
  return (
    <div className="min-h-screen hidden lg:flex items-center justify-center bg-gray-50 w-screen ">
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 flex ">
        <MdWarningAmber className="text-yellow-500 text-5xl mb-2" />
        <p className="text-lg font-semibold text-gray-700 text-center">
          Hiện tại chưa có thiết kế cho phiên bản web.
          <br />
          Vui lòng thử trên điện thoại!
        </p>
      </div>
    </div>
  );
};

export default WebViewNotice;
