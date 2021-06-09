import React from "react";

const ViewPollError = ({ error }: { error: string }) => {
  return (
    <div className="create-poll">
      <div>{error}</div>
      <div>
        <button onClick={() => window.location.reload()} className="btn-create">
          Reload
        </button>
      </div>
    </div>
  );
};

export default ViewPollError;
