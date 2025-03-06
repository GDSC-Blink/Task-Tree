import Image from "next/image";

export default function Profile() {
  return (
    <>
      <div className="flex flex-col items-center justify-center p-8">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
      </div>

      <div className="flex justify-center items-center">
        <div className="flex justify-center gap-40 items-center bg-white p-12 rounded-xl shadow-xl">
          <div className="flex-col relative w-48 h-48">
            <Image
              src="/placeholder.svg"
              alt=""
              layout="fill"
              objectFit="cover"
              className="rounded-full border hover:bg-gray-100"
            />
             <button className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white text-black text-sm font-medium border border-gray-300 rounded-full px-2.5 py-1 mt-2 hover:bg-gray-50 shadow-sm hover:shadow-md transition-all">
              Change
            </button>
          </div>

          <div className="flex-col space-y-8">
            <div>
              <h1 className="font-bold">Name</h1>
              <input 
                placeholder="Your Name"
                className="w-80 p-2 border rounded shadow-sm "
              />
            </div>

            <div>
              <h1 className="font-bold">University</h1>
              <input 
                placeholder="Your University"
                className="w-80 p-2 border rounded shadow-sm "
              />
            </div>

            <div>
              <h1 className="font-bold">Github</h1>
              <input 
                placeholder="Your Github"
                className="w-80 p-2 border rounded shadow-sm"
              />
            </div>

            <div>
              <h1 className="font-bold">Linkedin</h1>
              <input 
                placeholder="Your Linkedin"
                className="w-80 p-2 border rounded shadow-sm "
              />
            </div>

            <div>
              <button className="rounded-full bg-black border-l text-white p-4 hover:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}