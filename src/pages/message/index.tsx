export default function Home() {
  return (
    <div className="mt-10 sm:mt-0">
      <div className="mt-5 md:mt-0">
        <form action="#" method="POST">
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">First name</label>
                  <input type="text" name="first-name" id="first-name" className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
  
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                  <input type="text" name="last-name" id="last-name" className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
  
                <div className="col-span-6 sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                  <input type="text" name="email-address" id="email-address" className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
  
                <div className="col-span-6 sm:col-span-3">
                  <label  className="block text-sm font-medium leading-6 text-gray-900">Country</label>
                  <select id="country" name="country" className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
  
                <div className="col-span-6">
                  <label className="block text-sm font-medium leading-6 text-gray-900">Street address</label>
                  <input type="text" name="street-address" id="street-address" className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
  
                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label  className="block text-sm font-medium leading-6 text-gray-900">City</label>
                  <input type="text" name="city" id="city" className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
  
                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label  className="block text-sm font-medium leading-6 text-gray-900">State / Province</label>
                  <input type="text" name="region" id="region" className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
  
                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label className="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
                  <input type="text" name="postal-code" id="postal-code" className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button type="submit" className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Save</button>
            </div>
          </div>
        </form>
      </div>
  </div>
  )
}