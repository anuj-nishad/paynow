export function Button({buttonText}){
  return (
    <>
      <button type="submit" className="bg-blue-700 text-white w-full py-3 rounded-md my-5 hover:bg-blue-800">{buttonText}</button>
    </>
  )
}