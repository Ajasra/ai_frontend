import {useContext} from "react";
import {UserContext, UserDispatchContext} from "../../../User/UserContext";
import DocumentListPage from "../../../UI/Documents/DocumentPage";

export function AdminContent() {
	
	const userDetails = useContext(UserContext);
	const setUserDetails = useContext(UserDispatchContext);
	
	return (
		<>
			{
				userDetails?.page.content === "documents" &&
				<DocumentListPage type="all" />
			}
		</>
	);
}
