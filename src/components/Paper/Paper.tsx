import './Paper.css'
import {Masthead} from "../Masthead/Masthead.tsx";
import {Page} from "../Page/Page.tsx";

/** Simulated old-timey newspaper - because life was better when people got their propaganda exclusively in print form */
export const Paper = () => {
  return <div className="paper__container">
    <div className="paper__border paper__border--top" />
    <div className="paper">
      <Masthead />
      <Page />
    </div>
    <div className="paper__border paper__border--bottom" />
  </div>
}