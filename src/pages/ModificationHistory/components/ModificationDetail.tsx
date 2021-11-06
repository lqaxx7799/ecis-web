import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import companyTypeModificationActions from "../../../common/actions/companyTypeModification.action";

type Props = {

};

type RouteParams = {
  id: string,
};

const ModificationDetail = (props: Props) => {
  const dispatch = useAppDispatch();
  const { id: modificationId } = useParams<RouteParams>();

  const { loading, editingModification } = useAppSelector((state) => state.companyTypeModification);

  useEffect(() => {
    dispatch(companyTypeModificationActions.getById(parseInt(modificationId)));
  }, [dispatch, modificationId]);

  return (
    <div></div>
  );
};

export default ModificationDetail;
