import React from 'react'

export default function About() {
  return (
    <div className="py-16 bg-white">
      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className="md:5/12 lg:w-5/12">
            <img
              src="https://res.cloudinary.com/de9rb613m/image/upload/v1709369488/bg-image-about-recipe.webp"
              alt="image"
            />
          </div>
          <div className="md:7/12 lg:w-6/12">
            <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
              Cook, Connect, and Create: Welcome to Recipe Sharing!
            </h2>
            <p className="mt-6 text-gray-600">
              Indulge your culinary curiosity at our recipe sharing hub! Here,
              we celebrate the art of cooking and the joy of sharing delicious creations.
              From mouthwatering meals to decadent desserts,
              our platform is your go-to destination for inspiration, collaboration,
              and culinary adventure.
            </p>
            <p className="mt-4 text-gray-600">
              Join our community of food lovers, and let's explore the endless
              possibilities of flavor together!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}