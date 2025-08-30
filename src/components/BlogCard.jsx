import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";

const BlogCard = ({ blog, onEdit, onDelete }) => {
  const { deletingId } = useSelector((state) => state.blog);
  const isDeleting = deletingId === blog.id;

  return (
    <Card sx={{ position: "relative" }}>
      {blog.blog_media?.url && (
        <CardMedia
          component="img"
          height="150"
          image={blog.blog_media.url}
          alt={blog.title}
        />
      )}
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          {blog.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {blog.content}
        </Typography>
      </CardContent>
      <Box
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          display: "flex",
          gap: 1,
        }}
      >
        {isDeleting ? (
          <CircularProgress size={16} />
        ) : (
          <>
            <IconButton color="primary" onClick={() => onEdit(blog)}>
              <FaEdit size={16} />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => onDelete(blog.id)}
              disabled={isDeleting} // Disable the button while deleting
            >
              <FaTrash size={16} />
            </IconButton>
          </>
        )}
      </Box>
    </Card>
  );
};

export default BlogCard;
