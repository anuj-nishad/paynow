export function InputBox({typeinput , placeholdertext, name}){
  return (
    <div>
      <input type={typeinput} placeholder={placeholdertext} className='py-3 outline-none border-b-2 my-2 w-[300px] px-2' name={name} required/>
    </div>
  )
}