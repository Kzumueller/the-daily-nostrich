import './MastHead.css'
import {EditorInChief} from "../EditorInChief/EditorInChief.tsx";

const dateFormatter = new Intl.DateTimeFormat(window.navigator.language, { dateStyle: 'full', timeStyle: undefined })

/** Newspaper people have special names for everything, the masthead being the top bit of the front page containing the paper's name */
export const Masthead = () => {
  return <div className="mastHead">
    <div className="mastHead__title">The Daily Nostrich</div>
    <div className="mastHead__date">{dateFormatter.format(new Date)}</div>
    <EditorInChief/>
  </div>
}