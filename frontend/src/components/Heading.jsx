export function Heading({heading,subHeading}){
  return (
  <div className="w-full flex flex-col justify-center items-center my-6">
    <h1 className="text-5xl font-semibold mb-3">{heading}</h1>
    <p className="text-gray-500 text-base font-medium">{subHeading}</p>
  </div>
  )
}