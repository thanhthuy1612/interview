import LoadingScreen from "@/components/loadings/LoadingScreen";
import React from "react";

// ----------------------------------------------------------------------

const Loading: React.FC = () => {
  return (
    <div className="h-screen flex items-center">
      <LoadingScreen />
    </div>
  );
};
export default Loading;
