import Image from "next/image";

export default function Profile() {
  return (
    <>
      <div className="flex flex-col items-center justify-center p-8 ">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
      </div>

      <div className="flex justify-center items-center">
      <div className="flex justify-center gap-40 items-center">

        <div className="flex-col relative w-48 h-48">
          <Image
            src="/placeholder.svg"
            alt="Profile Picture"
            layout="fill"
            objectFit="cover"
            className="rounded-full bg-black"
          />
          
            </div>

          <div className="flex-col gap-9">
            <div>
              <h1  className=" font-bold">Name</h1>
              <input placeholder="Your Name">
              </input>
            </div>

            <div>
              <h1 className="font-bold">University</h1>
              <input placeholder="Your University"></input>
            </div>

            <div>
              <h1 className="font-bold">Github</h1>
              <input placeholder="Your Github"/>
            </div>
            <div>
              <h1 className="font-bold">Linkedin</h1>
              <input placeholder="Your Linkedin"/>

            </div>
            <div>
              <button className="rounded-full bg-black border-l text-white p-4">Save Changes</button>
            </div>
          </div>
          
          </div>
      </div>
    </>
  );
}
