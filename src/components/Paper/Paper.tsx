import './Paper.css'
import {MastHead} from "../Masthead/MastHead.tsx";
import {Page} from "../Page/Page.tsx";

export const Paper = () => {
  return <div className="paper__container">
    <div className="paper__border paper__border--top" />
    <div className="paper">
      <MastHead />
      <Page />
    </div>
    <div className="paper__border paper__border--bottom" />
  </div>
}