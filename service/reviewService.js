const { ObjectId } = require('mongodb');

const getAllReview = async (req, res) => {
  try {
    const allReview = await req.db.collection('review').find({ is_deleted: { $exists: false } }).toArray()
    if (allReview.length > 0) {
        res.status(200).json({
            message: 'Reviews successfully retrieved',
            data: allReview
    })
    } else {
        res.status(200).json({
        message: 'Review empty',
    })
    }
    
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createReview = async (req, res) => {
  const { title, genre, director, rating, review } = req.body
  console.log(title, genre, director, rating, review, '<=================== REVIEW ==================');
   
  try { 
    const newReview = await req.db.collection('review').insertOne({ 
      title, 
      genre, 
      director,  
      rating, 
      review,
      status: "pending"
    })
    res.status(200).json({
      message: 'Review successfully created',
      data: newReview
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateAllReview = async (req, res) => {
    const id = req.params.id
    const {title, genre, director, rating, review } = req.body
try{
    const overallUpdate = await req.db.collection('review').updateOne({ _id: new ObjectId(id) }, { $set: { title, genre, director, rating, review }})

    res.status(200).json({
    message: 'updated',
    data: overallUpdate,
  });
    
  } catch (error) {
    res.status(500).json({
      message: 'failed',
      data: error,
    });
  }
}

async function updateReview(req, res) {
  const id = req.params.id;
  const { status } = req.body;
  
  try {  
    const reviews = await req.db.collection('review').updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        status,
      },
    }
  );

  res.status(200).json({
    message: 'updated',
    data: reviews,
  });
    
  } catch (error) {
    res.status(500).json({
      message: 'failed',
      data: error,
    });
  }
}

const deleteReview = async (req, res) => {
  const id  = req.params;
  console.log(req.query, '<=================== DELETED ==================');
  const deleteReview = await req.db.collection('review').findOneAndUpdate(
    { _id: new ObjectId(id)},
    {
      $set: {
        is_deleted: true,
      },
    }
  );

  res.status(200).json({
    message: 'Deleted',
  });
}


module.exports = {
  getAllReview,
  createReview,
  updateAllReview,
  updateReview,
  deleteReview

}