import { prisma } from "@/lib/prismadb";
import ProductCard from "@/components/ProductCart";
import Image from "next/image";
import Link from "next/link";
import PaginationBar from "@/components/PaginationBar";

type HomeProps = {
  searchParams: { page: string };
};

export const getServerSideProps = async ({ searchParams }: HomeProps) => {
  const { page = "1" } = searchParams;
  const currentPage = parseInt(page);
  const pageSize = 3;
  const heroItemCount = 1;
  const totalItemCount = await prisma.product.count();
  const totalPages = Math.ceil(totalItemCount - heroItemCount) / pageSize;
  const product = await prisma.product.findMany({
    orderBy: { id: "desc" },
    skip:
      (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
  });

  return {
    props: {
      product,
      currentPage,
      totalPages,
    },
    revalidate: 1,
  };
};

const Home = ({ product, currentPage, totalPages }: any) => {
  return (
    <div className="flex flex-col items-center">
      {currentPage === 1 && (
        <div className="hero rounded-xl bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <Image
              src={product[0].imageUrl}
              alt={product[0].name}
              width={400}
              height={800}
              className="w-full max-w-sm rounded-lg shadow-2xl"
              priority
            />
            <div>
              <h2 className="text-2xl font-bold ">{product[0].name}</h2>
              <p className="py-6">{product[0].description}</p>
              <Link
                className="btn btn-primary border-stone-600"
                href={"/products/" + product[0].id}
              >
                Check it out
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(currentPage === 1 ? product.slice(1) : product).map(
          (product: any) => {
            return <ProductCard product={product} key={product.id} />;
          }
        )}
      </div>
      {totalPages > 1 && (
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
};

export default Home;
