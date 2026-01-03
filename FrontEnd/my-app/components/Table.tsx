
interface Column {
  key: string;
  header: string;
}

interface TableProps {
  columns: Column[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: Record<string, any>[];
}

const Table = ({ columns, rows }: TableProps) => {
  const getValueColor = (value: string) => {
    const lowerValue = value.toLowerCase();
    if (lowerValue === 'food') return 'text-orange-600 bg-orange-50';
    if (lowerValue === 'transport') return 'text-blue-600 bg-blue-50';
    if (lowerValue === 'income') return 'text-green-600 bg-green-50';
    if (lowerValue === 'work') return 'text-purple-600 bg-purple-50';
    if (lowerValue === 'entertainment') return 'text-pink-600 bg-pink-50';
    // return 'text-white bg-purple-600';
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rows.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td key={column.key} className={`px-6 py-4 whitespace-nowrap text-sm ${getValueColor(row[column.key])}`}>
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table