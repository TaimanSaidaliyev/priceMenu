import iconSelect from '../../utils/iconSelect'
import { MdClose } from "react-icons/md";


export default function ProductTags({ product, establishment }: { product: IProducts, establishment?: IEstablishment }) {
    return (
      <div className="flex flex-row flex-wrap gap-0.5">
        {product.tags.map((tag, index) => 
        
            establishment?.tags_type_view == 'FIRST' ? 
              <ProductTagView tag={tag} key={index}/> :
            establishment?.tags_type_view == 'SECOND' ? 
              <ProductTagSimpleView tag={tag} key={index}/> : 
              <ProductTagOntStyleView tag={tag} key={index} establishment={establishment}/>
        )}
      </div>
    );
}

const ProductTagView = ({tag}:{tag: ITags}) => {
  return (
    <>
    <span
        className={`
          inline-flex items-center px-2 py-1 text-xs font-medium text-${tag.color}-800 bg-${tag.color}-100 rounded-lg gap-1
        `}
      >
        {iconSelect(tag.icon, 12)} {tag.title}
    </span>
    <span className='
      text-blue-800 bg-blue-100 
      text-gray-800 bg-gray-100
      text-red-800 bg-red-100
      text-green-800 bg-green-100
      text-pink-800 bg-pink-100
      text-yellow-800 bg-yellow-100
      text-indigo-800 bg-indigo-100
      text-purple-800 bg-purple-100
      '></span>
    </>
  )
}

const ProductTagSimpleView = ({tag}:{tag: ITags}) => {
  return (
    <>
      <span
        className={`
          inline-flex items-center pe-1 py-1 text-sm font-medium text-${tag.color}-800 gap-1
          `}
          >
        {iconSelect(tag.icon)}
      </span>
      <span className='
      text-blue-800 bg-blue-100 
      text-gray-800 bg-gray-100
      text-red-800 bg-red-100
      text-green-800 bg-green-100
      text-pink-800 bg-pink-100
      text-yellow-800 bg-yellow-100
      text-indigo-800 bg-indigo-100
      text-purple-800 bg-purple-100
      '></span>  
    </>
  )
}

const ProductTagOntStyleView = ({tag, establishment}:{tag: ITags, establishment: IEstablishment | undefined}) => {
  return (
    <>
    <div className='flex gap-0.5 me-2 mb-1 items-center'>
      <span style={{background: establishment?.default_color}} className='text-white flex items-center px-1 py-1 rounded-full'>
        {iconSelect(tag.icon, 14)} 
      </span>
      <span className="text-xs" style={{color: establishment?.default_color}}>
      {tag.title}  
      </span>
    </div>

    </>
  )
}

export const ProductSettingsTagView = ({tag, removeTag}:{tag: ITags, removeTag: Function}) => {
  return (
    <span
        className={`
          inline-flex items-center px-2 py-1 text-sm font-medium text-gray-800 bg-gray-100 rounded-lg gap-1 cursor-pointer
        `}
      >
        {iconSelect(tag.icon)} {tag.title}
        <MdClose onClick={()=>removeTag(tag.id)}/> 
    </span>
  )
}