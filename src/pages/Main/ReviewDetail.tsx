import React from "react";
import api from "api";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "reducers";
import { clickHeartBtn, countLike } from "actions";
import { CgSmile } from "react-icons/cg";
import { CgSmileSad } from "react-icons/cg";
import { CgSmileNone } from "react-icons/cg";
import { AiOutlineClose } from "react-icons/ai";
import { HiHeart } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { ModalLayout, ModalBox } from "widget/Modal";
import Title from "widget/Title";
import Name from "widget/Name";
import { BookImg, BookImgBox } from "widget/BookImg";
import Grade from "widget/Grade";
import { CircleButton } from "widget/SmallButton";
import BookInfo from "widget/BookInfo";
import { ReviewContent, Contents } from "widget/ReviewContent";
import Quote from "widget/Quote";

interface ReviewDetailProps {
  closeDetail: () => void;
}

const ReviewDetail: React.FunctionComponent<ReviewDetailProps> = (props) => {
  const { reviewIds } = useSelector((state: RootState) => state.ReviewReducer);
  const { closeDetail } = props;
  const dispatch = useDispatch();
  const { reviewDetail, countHeart } = useSelector(
    (state: RootState) => state.ReviewReducer
  );

  const recommendReview = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.stopPropagation();
    if (localStorage.getItem("myId")) {
      await api.likeReview(id);
      dispatch(countLike(id));
      dispatch(clickHeartBtn(id));
    } else {
      alert("로그인이 필요한 서비스입니다.");
    }
  };

  return (
    <ModalLayout onClick={closeDetail}>
      <ModalBox onClick={(e) => e.stopPropagation()} review>
        <CircleButton mode="default">
          <AiOutlineClose size="20" onClick={closeDetail} />
        </CircleButton>
        {reviewDetail && (
          <>
            <BookInfo detail>
              <BookImgBox review>
                <BookImg
                  src={reviewDetail.book_detail.image}
                  alt="book-cover"
                />
              </BookImgBox>
              <div className="book-title">
                <Title>{reviewDetail.book_detail.title}</Title>
                <Name>{reviewDetail.book_detail.author}</Name>
                <Grade>
                  <CgSmile
                    size="30"
                    className={reviewDetail.rating === 1 ? "select" : ""}
                  />
                  <CgSmileNone
                    size="30"
                    className={reviewDetail.rating === 2 ? "select" : ""}
                  />
                  <CgSmileSad
                    size="30"
                    className={reviewDetail.rating === 3 ? "select" : ""}
                  />
                </Grade>
              </div>
            </BookInfo>
            <ReviewContent>
              <Title review>{reviewDetail.title}</Title>
              <Name>{reviewDetail.user_info.nickname}</Name>
              <Contents>{reviewDetail.content}</Contents>
              <CircleButton
                mode="detail"
                onClick={(e) => recommendReview(e, reviewDetail.id)}
              >
                {reviewIds.includes(reviewDetail.id) ? (
                  <HiHeart size="18" color="#d3492a" />
                ) : (
                  <HiOutlineHeart size="18" />
                )}
                {countHeart && countHeart[reviewDetail.id]}
              </CircleButton>
            </ReviewContent>
            <Quote>{reviewDetail.quote}</Quote>
          </>
        )}
      </ModalBox>
    </ModalLayout>
  );
};

export default ReviewDetail;
