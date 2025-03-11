export function InputBar({value,example,onChange}) {
    return (
        <div>
            <div className="text-sm font-medium text-left py-2">
                {value}
            </div>
            <input
                onChange={onChange} 
                type="email"
                id="helper-text"
                aria-describedby="helper-text-explanation"
                className="mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={example}
            />
        </div>
    );
}
