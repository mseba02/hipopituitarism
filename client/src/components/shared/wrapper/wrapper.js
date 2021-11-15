import './wrapper.css';

const container = (props) => {
    return (
        <div className={`container ${props.className}`}>{props.children}</div>
    )
}

export default container;