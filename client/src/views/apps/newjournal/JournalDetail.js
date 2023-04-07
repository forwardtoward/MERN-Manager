import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Input, Row } from 'reactstrap';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import { AiOutlineClose, AiOutlineDelete } from 'react-icons/ai';
import { BsPlusSquare } from 'react-icons/bs';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import HtmlParser from 'react-html-parser';
import moment from 'moment';
import {
  createMyJournalById,
  deleteJournalListById,
  getOneJournalListById
} from '../../../requests/myJournal/getMyJournal';
import '../../../../src/assets/styles/jaornal.scss';

export default function JournalDetail({
  statusOpen,
  setStatusOpen,
  viewDetailsId,
  setSideBarUpdateData,
  detailsSelectedItem
}) {
  const [editorState, seteditorState] = useState(EditorState.createEmpty());
  const [Upload, setUpload] = useState([]);
  const [journaldata, setJournaldata] = useState({});
  const [desc, setdesc] = useState('');
  let date = new Date();
  let mDate = moment(date);
  const handleSubmit = () => {
    const title = localStorage.getItem('jounaltitle');
    const datas = new FormData();
    datas.append('date', mDate.format('YYYY-MM-DD'));
    datas.append('type', 'Notes');
    datas.append('title', title);
    datas.append('desc', desc);
    datas.append('file', Upload);
    datas.append('journal_category', localStorage.getItem('journalId'));
    createMyJournalById(datas).then((response) => {
      setSideBarUpdateData(true);
      seteditorState('');
      setUpload([]);
    });
  };

  const onEditorStateChange = (editorState) => {
    seteditorState(editorState);
    setdesc(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  const detailPageView = () => {
    async function fetchData() {
      await getOneJournalListById(viewDetailsId ? viewDetailsId : detailsSelectedItem?._id).then(
        (response) => {
          setJournaldata(response);
          setStatusOpen('open');
        }
      );
    }
    fetchData();
  };

  useEffect(() => {
    detailPageView();
  }, [viewDetailsId ? viewDetailsId : detailsSelectedItem]);
  return (
    <div>
      <div className="detail-m">
        <p className="mm-1">
          <span className="right-side">
            {statusOpen === 'open' ? (
              <>
                <button
                  type="button"
                  class="waves-effect btn-icon me-1 btn btn-outline-primary"
                  onClick={() => {
                    setStatusOpen('close');
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
                {/* <BsPlusSquare
                  style={{ cursor: 'pointer' }}
                  size={25}
                  className="categorybtntext mb-2 mr-2"
                  fill="#174ae7"
                ></BsPlusSquare> */}

                <button
                  type="button"
                  class="waves-effect btn-icon me-1 btn btn-outline-primary  btn-rh"
                  onClick={() => {
                    deleteJournalListById(journaldata?._id);
                    setSideBarUpdateData(true);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
                {/* <AiOutlineDelete
                  style={{ cursor: 'pointer' }}
                  fill="#174ae7"
                  className="categorybtntext mb-2"
                  size={25}
                  onClick={() => {
                    deleteJournalListById(journaldata?._id);
                    setSideBarUpdateData(true);
                  }}
                /> */}
              </>
            ) : (
              <AiOutlineClose
                style={{ cursor: 'pointer' }}
                size={20}
                onClick={() => {
                  setStatusOpen('open');
                }}
              ></AiOutlineClose>
            )}
          </span>
        </p>
        {statusOpen === 'open' ? (
          <>
            {moment(journaldata?.date).format('Y-MMM-D')}
            <div className="detail-view">
              <Container>
                <Row>
                  <Col md="12" className="mt-1">
                    <img src={journaldata?.jrnl_img} className="" alt="jrnl_img" width="100%" />
                  </Col>
                  <Col md="12" className="mt-1 mb-2">
                    <p>{HtmlParser(journaldata?.desc)}</p>
                  </Col>
                </Row>
              </Container>
            </div>
          </>
        ) : (
          <>
            <div className="detail-1 mt-2">
              <Container>
                <Form>
                  <Row>
                    <Col md="12" className="mt-1 mb-1">
                      <Input
                        onChange={(e) => setUpload(e.target.files[0])}
                        type="file"
                        className="form-control"
                        name="file"
                      />
                    </Col>
                    <Col md="12">
                      <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={onEditorStateChange}
                        toolbar={{
                          options: ['inline', 'textAlign'],
                          inline: {
                            inDropdown: false,
                            options: ['bold', 'italic', 'underline', 'strikethrough']
                          }
                        }}
                      />
                    </Col>
                    <Col md="12">
                      <div className="btn-st-r">
                        <Button color="primary" outline onClick={handleSubmit}>
                          Save
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Container>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
