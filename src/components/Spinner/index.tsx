interface IProps {
  text: string;
}

const Spinner = (props: IProps) => {
  const { text } = props;
  const header = text ? <h4>{text}</h4> : null;
  return (
    <div className='spinner'>
      {header}
      <div className='loader' style={{ height: '5em', width: '5em' }} />
    </div>
  );
};

export default Spinner;
