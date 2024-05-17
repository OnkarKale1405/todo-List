// InfiniteScroll.js
import React, { useState, useEffect, useRef } from 'react';
import { format, addDays } from 'date-fns';
import 'tailwindcss/tailwind.css';

const generateDates = (startDate, numberOfDays) => {
    let dates = [];
    for (let i = 0; i < numberOfDays; i++) {
        let current = addDays(startDate, i);
        dates.push(format(current, 'MMMM d')); // e.g., July 28
    }
    return dates;
};

const InfiniteScroll = () => {
    const [dates, setDates] = useState([]);
    const loadMoreThreshold = 5; // Number of days before reaching the end to load more
    const scrollContainerRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    useEffect(() => {
        const initialDates = generateDates(new Date(), 30); // Initial load of 30 days
        setDates(initialDates);
    }, []);

    const loadMoreDates = () => {
        const moreDates = generateDates(new Date(dates.length), 30);
        setDates(prevDates => [...prevDates, ...moreDates]);
    };

    const handleMouseDown = (e) => {
        isDragging.current = true;
        startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
        scrollLeft.current = scrollContainerRef.current.scrollLeft;
        scrollContainerRef.current.classList.add('cursor-grabbing');
    };

    const handleMouseLeaveOrUp = () => {
        isDragging.current = false;
        scrollContainerRef.current.classList.remove('cursor-grabbing');
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX.current) * 2; // Multiplier for faster scrolling
        scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
    };

    return (
        <div
            className="flex overflow-x-scroll no-scrollbar cursor-grab py-2"
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
        >
            {dates.map((date, index) => (
                <div key={index} className="flex-shrink-0 px-4 whitespace-nowrap">
                    <p>{date}</p>
                </div>
            ))}
        </div>
    );
};

export default InfiniteScroll;
