import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { SearchFilters } from './search-filters';
import { Category } from '@/payload-types';


interface Props {
  children: React.ReactNode;
}

const layout = async ({ children }: Props) => {
  const payload = await getPayload({
        config: configPromise,
      })

  const data = await payload.find({
      collection: "categories",
      depth: 1, // populate subcategories, subcategories[0] will be a type of Category
      pagination: false,
      where: {
        parent: {
          exists: false
        }
      }
    })

      const formatedData = data.docs.map((doc) => ({
        ...doc,
        subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
          //Because of 'Deapth: 1, we are confident that "doc" will be type of "Category"
          ...(doc as Category),
          subcategories: undefined 
        }))
      }))
      console.log({
        data,
        formatedData
      })
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <SearchFilters data={formatedData} />
        <div className="flex-1 bg-[#F4F4F0]">
          {children}
          </div>
        <Footer />
      </div>
    </div>
  );
}
export default layout;

