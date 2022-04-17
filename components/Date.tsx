import { format, parseISO } from 'date-fns';
import type { NextPage } from 'next';

type IProps = {
  dateString: string;
}

const Date: NextPage<IProps> = ({ dateString }) => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}

export default Date;
