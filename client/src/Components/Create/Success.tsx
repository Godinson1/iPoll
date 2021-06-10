import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import "./styles.scss";

const Success = (data: any) => {
  const [copy, setCopy] = useState(false);

  return (
    <div>
      <div className="create">
        <div className="create-form">
          <h1>Poll created Successfully!!!</h1>
          <div>
            Copy link below to view poll or/and share on social platforms.
          </div>
          <br />
          <br />
          <div className="flex">
            <div className="link-container">
              <div>{data.data.viewLink}</div>
              <CopyToClipboard
                text={data.data.viewLink}
                onCopy={() => setCopy(!copy)}
              >
                <div className="btn-link">{copy ? "Copied" : "Copy"}</div>
              </CopyToClipboard>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div>Share on:</div>
        <div className="flex-btn">
          <div>
            <FacebookShareButton
              children={<button className="btn-create">FACEBOOK</button>}
              url={data.data.viewLink}
            />
          </div>
          <div>
            <WhatsappShareButton
              children={<button className="btn-create">WHATSAPP</button>}
              url={data.data.viewLink}
            />
          </div>
          <div>
            <TwitterShareButton
              children={<button className="btn-create">TWITTER</button>}
              url={data.data.viewLink}
            />
          </div>
        </div>
        <br /> <br />
        <br /> <br />
        <div onClick={() => window.location.reload()}>
          Not yet done?{" "}
          <span id="ca" className="secondary">
            CREATE ANOTHER.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Success;
