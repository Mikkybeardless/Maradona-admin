import FirstCar from "../assets/Dashboard-Car-1.png"
import SecondCar from "../assets/Dashboard-Car-2.png"
import ThirdCar from "../assets/Dashboard-Car-3.png"
import Slider, { Settings } from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"

export default function HomeCarousel() {
    const settings: Settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    }

    function SampleNextArrow(props: any) {
        const { onClick } = props
        return (
            <FaChevronRight
                className="absolute top-[45%] right-3 cursor-pointer z-10"
                color="white"
                size={24}
                onClick={onClick}
            />
        )
    }

    function SamplePrevArrow(props: any) {
        const { onClick } = props
        return (
            <FaChevronLeft
                className="absolute top-[45%] left-3 cursor-pointer z-10"
                color="white"
                size={24}
                onClick={onClick}
            />
        )
    }

    return (
        <Slider
            className="w-full bg-[#08093F] rounded-[16px] h-[400px] relative"
            {...settings}
        >
            <div className="!flex justify-between items-center px-16 h-full w-full">
                <div className="flex flex-col basis-[25%] text-white">
                    <h1 className="text-3xl leading-[2.5rem] tracking-[1.6px]">
                        Be on the road in comfort and style
                    </h1>
                    <p className="text-sm mt-3 font-light leading-[1.1rem] tracking-[1px]">
                        Equip your vehicle for the adventure of a lifetime.
                    </p>
                    <button className="px-4 py-2.5 w-fit mt-10 rounded-[8px] bg-white text-black">
                        Shop now
                    </button>
                </div>

                <div className="flex justify-between gap-x-10 text-white">
                    <div className="flex flex-col gap-y-4 items-center">
                        <img
                            className="h-[170px] w-auto rounded-[8px] object-fill"
                            src={FirstCar}
                            alt="Car"
                        />
                        <p className="text-center max-w-[70%]">
                            Car racks & roof boxes
                        </p>
                    </div>
                    <div className="flex flex-col gap-y-4 items-center">
                        <img
                            className="h-[170px] w-auto rounded-[8px] object-fill"
                            src={SecondCar}
                            alt="Car"
                        />
                        <p className="text-center max-w-[70%]">
                            Car racks & roof boxes
                        </p>
                    </div>
                    <div className="flex flex-col gap-y-4 items-center">
                        <img
                            className="h-[170px] w-auto rounded-[8px] object-fill"
                            src={ThirdCar}
                            alt="Car"
                        />
                        <p className="text-center max-w-[70%]">
                            Car racks & roof boxes
                        </p>
                    </div>
                </div>
            </div>

            <div className="!flex justify-center w-full h-full items-center text-white">
                <h3 className="text-2xl">No content Yet</h3>
            </div>
        </Slider>
    )
}
