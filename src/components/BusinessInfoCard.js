import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';
import './Styles/BusinessInfoCard.css'; 

const cardStyle = 
{
  maxWidth: 300,
  margin: '10px'
};

function BusinessInfoCard(props) {
  const { business } = props;

  if(!business) {
    return <Typography color="error">Business data is unavailble</Typography>
  }

  const { imageUrl, name, rating, review } = business;

  return (
    <Card style={cardStyle}>
      {imageUrl ? (
        <CardMedia
        component="img"
        height="140"
        image={business.imageUrl}
        alt={business.name || "Business"}
      />
      ) : (
        <Typography variant = "body2" color="textSecondary">
          Image not available
        </Typography>
      )}
      
      <CardContent>
        <Typography variant="h6">{business.name || "Unknown Business"}</Typography>
        <Rating value={business.rating || 0} precision={0.5} readOnly />
        <Typography variant="body2" color="textSecondary">
          {business.review || "No review available."}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BusinessInfoCard;

