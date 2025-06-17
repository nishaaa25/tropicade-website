import Image from 'next/image';
import React from 'react'

const AboutCards = () => {

  const cardsData = [
    {
      id: 1,
      title: "Amazing print quality & the reflected design is far more better than I expected. Loved it! We're a small team based in Tallinn, Estonia: a manager handling production and customer care, two dedicated designers who work one-on-one with clients to bring their ideas to life.",
      author: "JOHN",
      company: "T-SHIRT",
      designation: "DESIGNER",
      avatar: "/api/placeholder/50/50"
    },
    {
      id: 2,
      title: "We're a small team based in Tallinn, Estonia: a manager handling production and customer care, two dedicated designers who work one-on-one with clients to bring their ideas to life.",
      author: "SARAH",
      company: "T-SHIRT",
      designation: "DESIGNER",
      avatar: "/api/placeholder/50/50"
    },
    {
      id: 3,
      title: "Amazing print quality & the reflected design is far more better than I expected. Loved it! We're a small team based in Tallinn, Estonia: a manager handling production and customer care, two dedicated designers who work one-on-one with clients to bring their ideas to life.",
      author: "MIKE",
      company: "T-SHIRT",
      designation: "DESIGNER",
      avatar: "/api/placeholder/50/50"
    },
    {
      id: 4,
      title: "We're a small team based in Tallinn, Estonia: a manager handling production and customer care, two dedicated designers who work one-on-one with clients to bring their ideas to life.",
      author: "EMILY",
      company: "T-SHIRT",
      designation: "DESIGNER",
      avatar: "/api/placeholder/50/50"
    },
    {
      id: 4,
      title: "We're a small team based in Tallinn, Estonia: a manager handling production and customer care, two dedicated designers who work one-on-one with clients to bring their ideas to life.",
      author: "EMILY",
      company: "T-SHIRT",
      designation: "DESIGNER",
      avatar: "/api/placeholder/50/50"
    }
  ];

  return (
    <div className='h-[75vh] w-full pt-28 flex gap-4'>
      {
        cardsData.map((item, index) => {
          return (
            <div key={index} className={`h-[50vh] w-[22vw] relative bg-[#24022C] p-4 ${
              index === 2
                ? "bottom-[16vh]"
                : index === 1 || index === 3
                ? "bottom-[8vh]"
                : "bottom-0"
            }`}>
              <p className='text-sm font-extralight opacity-50'>
                {item.title}
              </p>
              <div className='py-6 flex gap-4'>
                <div className='w-16 h-16 relative flex-shrink-0'>
                  <Image
                    src="/assets/landingAnimation-1.png"
                    fill
                    className='rounded-full object-cover'
                    alt="Profile"
                  />
                </div>
                <div className='uppercase w-fit flex flex-col justify-center gap-2'>
                  <p className='uppercase leading-none font-bebas text-xs opacity-50'>{item.company}</p>
                  <div className='flex items-center gap-2'>
                    <p className='leading-none inline-block'>BOOTLEG</p>
                    <p className='px-2 leading-none py-1 text-xs text-[#EAB651] bg-[#EAB6511A] inline-block'>{item.designation}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default AboutCards