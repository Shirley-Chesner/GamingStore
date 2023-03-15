import './Carousel.css';

import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Skeleton } from '@mui/material';
import classNames from 'classnames';

export interface Item {
    id: number;
    name: string;
    imageUrl: string;
    onClick?: (id: number) => void;
}

interface Props {
    items: Item[];
    title: React.ReactNode;
    className?: string;
    itemsInOneSlider?: number;
    autoSlide?: boolean;
    isLoading?: boolean;
    randomColors?: boolean;
    onClickItem?: (id: number) => void;
}

type SlideDirection = 'prev' | 'next';

export const Carousel: FC<Props> = ({
    items,
    itemsInOneSlider = 1,
    autoSlide,
    title,
    isLoading,
    className,
    randomColors,
    onClickItem,
}) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [nextSlide, setNextSlide] = useState(-1);
    const [slideTo, setSlideTo] = useState<SlideDirection | null>(null);

    const interval = useRef<NodeJS.Timer>();

    const maxSlides = useMemo(
        () => Math.ceil(items.length / itemsInOneSlider),
        [items, itemsInOneSlider],
    );

    const itemsMatrix = useMemo(
        () => arrayToMatrix(items, itemsInOneSlider),
        [items, itemsInOneSlider],
    );

    const getSlideClassNames = useCallback(
        (index: number) => {
            const isActive = currentSlide === index;
            const isNextSlide = nextSlide === index;

            const animationClassnames = {
                ['carousel-slide-' + slideTo]: isNextSlide,
                ['carousel-slide-' + (slideTo === 'next' ? 'start' : 'end')]: isActive,
            };

            return classNames('carousel-slide', {
                active: isActive,
                ...(slideTo ? animationClassnames : {}),
            });
        },
        [currentSlide, nextSlide],
    );

    const getNextSlide = useCallback(
        (slideTo: SlideDirection) => {
            if (slideTo === 'next') return currentSlide < maxSlides - 1 ? currentSlide + 1 : 0;
            return currentSlide > 0 ? currentSlide - 1 : maxSlides - 1;
        },
        [maxSlides, currentSlide],
    );

    const slideWithAnimation = useCallback(
        (slideDirection: SlideDirection, nextSlide?: number) => {
            if (slideTo) return;

            const next = nextSlide ?? getNextSlide(slideDirection);
            setNextSlide(next);
            setSlideTo(slideDirection);

            setTimeout(() => {
                setNextSlide(-1);
                setCurrentSlide(next);
                setSlideTo(null);
            }, 1000);
        },
        [getNextSlide],
    );

    useEffect(() => {
        if (autoSlide) interval.current = setInterval(() => slideWithAnimation('next'), 5000);

        return () => clearInterval(interval.current);
    }, [autoSlide, slideWithAnimation]);

    return (
        <div className={classNames('carousel-wrapper', className)}>
            <h1 className="carousel-title">{title}</h1>
            <div className="carousel">
                {isLoading ? (
                    <div className="carousel-slide active">
                        {Array.from({ length: itemsInOneSlider }).map((_, index) => (
                            <Skeleton
                                key={`skeleton|${index}`}
                                className="carousel-item"
                                width={`${100 / itemsInOneSlider}%`}
                            />
                        ))}
                    </div>
                ) : (
                    itemsMatrix.map((items, index) => (
                        <div className={getSlideClassNames(index)} key={index}>
                            {items.map((item, index) => (
                                <CarouselItem
                                    key={item.id}
                                    index={index}
                                    {...item}
                                    width={100 / itemsInOneSlider}
                                    onClick={onClickItem}
                                    randomColors={randomColors}
                                />
                            ))}
                        </div>
                    ))
                )}
                {maxSlides > 1 && (
                    <>
                        <CarouselArrowIcon type="prev" onClick={slideWithAnimation} />
                        <CarouselArrowIcon type="next" onClick={slideWithAnimation} />
                        <div className="carousel-bread-crumbs">
                            {Array.from({ length: maxSlides }).map((_, index) => (
                                <CarouselBreadCrumb
                                    key={index}
                                    slide={index}
                                    onClick={slideWithAnimation}
                                    isInAnimation={!!slideTo}
                                    currentSlide={currentSlide}
                                    nextSlide={nextSlide}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

interface ArrowIconProps {
    type: SlideDirection;
    onClick: (slideTo: SlideDirection) => void;
}

const CarouselArrowIcon: FC<ArrowIconProps> = ({ type, onClick }) => {
    const handleClick = useCallback(() => onClick(type), [onClick, type]);

    return (
        <div className={classNames('carousel-arrow', type)} onClick={handleClick}>
            {type === 'next' ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}
        </div>
    );
};

const COLORS = [
    'rgba(0, 145, 110, 0.4)',
    'rgba(255, 207, 0, 0.4)',
    'rgba(238, 97, 35, 0.4)',
    'rgba(250, 0, 63, 0.4)',
];

type CarouselItemProps = Item & {
    width: number;
    index: number;
    randomColors?: boolean;
};

const CarouselItem: FC<CarouselItemProps> = ({
    width,
    id,
    name,
    index,
    imageUrl,
    randomColors,
    onClick,
}) => {
    const handleClick = useCallback(() => onClick?.(id), [id, onClick]);

    return (
        <div
            className={classNames('carousel-item', { click: !!onClick })}
            onClick={handleClick}
            style={{ width: `${width}%` }}
            key={id}
        >
            <h2
                className="item-name"
                style={randomColors ? { backgroundColor: COLORS[index % 4] } : undefined}
            >
                {name}
            </h2>
            <img className="item-img" src={imageUrl} />
        </div>
    );
};

interface CarouselBreadCrumbProps {
    slide: number;
    isInAnimation: boolean;
    currentSlide: number;
    nextSlide: number;
    onClick: (slideDirection: SlideDirection, nextSlide: number) => void;
}

const CarouselBreadCrumb: FC<CarouselBreadCrumbProps> = ({
    currentSlide,
    isInAnimation,
    nextSlide,
    onClick,
    slide,
}) => {
    const handleClick = useCallback(
        () => onClick(slide < currentSlide ? 'prev' : 'next', slide),
        [slide, currentSlide],
    );

    const breadCrumbsClassnames = useMemo(
        () =>
            classNames('bread-crumb', {
                active: currentSlide === slide,
                next: nextSlide === slide,
                prev: currentSlide === slide && isInAnimation,
            }),
        [currentSlide, slide, nextSlide, isInAnimation],
    );

    return <div onClick={handleClick} className={breadCrumbsClassnames} />;
};

const arrayToMatrix = (array: Item[], columns: number): Item[][] =>
    Array(Math.ceil(array.length / columns))
        .fill(null)
        .reduce((prev, _, index) => {
            return [...prev, [...array].splice(index * columns, columns)];
        }, []);
