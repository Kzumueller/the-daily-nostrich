import './MastHead.css'

const dateFormatter = new Intl.DateTimeFormat(window.navigator.language, { dateStyle: 'full', timeStyle: undefined })

export const MastHead = () => {
  return <div className="mastHead">
    <div className="mastHead__title">The Daily Nostrich</div>
    <div className="mastHead__date">{dateFormatter.format(new Date)}</div>
  </div>
}