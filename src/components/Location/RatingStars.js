import React from "react";
import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import "./RatingStars.css";

export const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="rating-stars">
      {[...Array(fullStars)].map((_, index) => (
        <StarIcon key={index} />
      ))}
      {hasHalfStar && <StarHalfIcon />}
      {[...Array(5 - Math.ceil(rating))].map((_, index) => (
        <StarBorderIcon key={index} />
      ))}
    </div>
  );
};
