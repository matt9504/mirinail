import styled from 'styled-components'
import UnderLineInput from '../../Commons/UnderLineInput'
import FileUpload from './FileUpload'
import {useState,useEffect} from 'react'
import { create } from 'ipfs-http-client'
import axios from 'axios'
import publishToken from '../../BlockChain/PublishNFT'

const Wrapper = styled.div`
  * {
  margin: 0px;
  padding: 0px;
  position: relative;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
  
  }

  height : 100vh;

  
`
const MainFrame = styled.div`
  width :1300px;
  height: 100%;
  margin : 0 auto;
  

  .MainPadding {
    height:100%;
    margin : 0px 10px;

    .ItemList {
      padding-left:180px;
      height:100%;

      .LeftBox {
        position: absolute;
        padding-right: 100px;
        left: 0px;
        top: 0px;
        z-index: 10;
        padding-top: 75px;
        
        .TypeFilter {
          a { 
            display:block; 
            color:#3D3C3A; 
            opacity:0.5; 
            transition:all 0.3s; 
            font-size:14px; 
            margin-bottom:20px;
          }
          a.active{ opacity:1;}
          a:hover{ opacity:1;}
        }
        
        .OrderFilter {
          margin-top:100px;
          a { 
            display:block; 
            color:#3D3C3A; 
            opacity:0.5; 
            transition:all 0.3s; 
            font-size:14px; 
            margin-bottom:20px;
          }
          a.active{ opacity:1;}
          a:hover{ opacity:1;}
          .CheckBox {
            display:block;
            font-size:14px; 
            color:#3D3C3A; 
            label {
              margin-left: 7px;
            }
          }
          
        }

        

      
      }

      .RightBox {
        padding-left :80px;
        height :100%;
        padding-top: 75px;
        width: 100%;
        border-left: 1px solid #d2d2d0;
        padding-bottom: 160px;
        text-align: left;
        .subTitle {
          font-weight : bold;
          font-size : 18px;
          border-bottom :5px solid #e3e3e3;
          margin-right: 100px;
          padding-bottom : 5px;
        }
        .fileBox {
          margin-top :48px;
        }
        .infoBox {
          margin-top : 48px;
        }
       
        textarea {
          
          width :90%;
          display: block ;
          // margin : 0 auto;
          margin-top : 24px;
          height : 250px;
        }

        .buttons {
          margin-top: 48px;
          display : flex;
          justify-content : center;
          width:90%;
          .btn1 {
            background-color:rgb(51, 51, 51);
            color:white;
            padding: 10px 40px 10px 40px;
            margin : 10px 5px 10px 10px;
            border-radius :5px;
          }
          .btn2 {
            border : 1px solid rgb(51, 51, 51);
            color:rgb(51, 51, 51);
            padding: 10px 40px 10px 40px;
            margin : 10px 20px 10px 30px;
            border-radius :5px;
        }
      }
      
    }
  }
`


const PageContent = () => {
  const [imageProcess,setImageProcess] = useState([])
  const [infoProcess,setInfoProcess] = useState({
    type :'',
    season : '',
    price :'',
    colorType :'',
    detailColor :''
  })
  const [infoProcessNum,setInfoProcessNum] = useState(0)
  const [textProcess,setTextProcess] = useState('')
  useEffect(() => {
    console.log(imageProcess)
  },[imageProcess])


  const onChangeText = (e:any) => {
    setTextProcess(e.target.value) 

  }
  // useEffect(() => {
  //   console.log(infoProcess)
  // },[infoProcess])
  useEffect(() => {
    let abc = 0
    if (infoProcess.type != '') {
      abc += 1
    } 
    if (infoProcess.season != '') {
      abc += 1
    } 
    if (infoProcess.price != '') {
      abc += 1
    } 
    if (infoProcess.colorType != '') {
      abc += 1
    } 
    if (infoProcess.detailColor != '') {
      abc += 1
    }
    setInfoProcessNum(abc)
    console.log(infoProcess)

  },[infoProcess])

  // ipfs 등록 및 nft 발급
  const abc:any = 'http://127.0.0.1:5002'
  const client = create(abc)
  const nftFunc = async () => {
    const nailData:any = {images:imageProcess,...infoProcess}
    console.log(nailData)
    const response = await client.add(JSON.stringify(nailData))
    const ipfsHash = response.path
    console.log(ipfsHash)
    publishToken(ipfsHash)
  }

  return (
    <>
      <Wrapper>
        <MainFrame>
        <div className="MainPadding">
          <div className="ItemList">
            <div className="LeftBox">
         
              <div className="OrderFilter">
                <a>정렬</a>
                <div className="CheckBox">
                  <input type="checkbox" id="cb1" checked={imageProcess.length === 2 ? true : false}/>
                  <label htmlFor="cb1">이미지 등록 ({imageProcess.length}/2)</label>
                </div>
                <div className="CheckBox">
                  <input type="checkbox" id="cb2" checked={infoProcessNum === 5 ? true : false}/>
                  <label htmlFor="cb2">네일정보 등록 ({infoProcessNum}/5)</label>
                </div>
                <div className="CheckBox">
                  <input type="checkbox" id="cb3" checked={textProcess.length >= 10 ? true : false}/>
                  <label htmlFor="cb3">소개글 등록 ({textProcess.length >= 10 ? 1 : 0}/1)</label>
                </div>
              </div>

           
            </div>
            <div className="RightBox">
              <div className='subTitle' style={{marginTop:"48px"}}>
                이미지 등록
              </div>
              <div className='fileBox'>
                <FileUpload setImageProcess={setImageProcess}/>
              </div>
              <div className='subTitle' style={{marginTop:"120px"}}>
                네일정보 등록
              </div>
              <div className='infoBox'>
                <UnderLineInput setInfoProcess={setInfoProcess}/>
              </div>
              <div className='subTitle' style={{marginTop:"120px"}} >
                소개글 등록 (10자 이상 입력해주세요.)
              </div>
              <textarea name="textVal" id="" onChange={onChangeText}>asdfsd</textarea>
              <div className="buttons">
                <div className="btn1" onClick={nftFunc}>
                  등록
                </div>
                <div className="btn2">
                  취소
                </div>
              </div>
     
            </div>
          
          </div>
          
        </div>
        <div>
          
        </div>
        </MainFrame>
        
      </Wrapper>
      
    </>
  )
}

export default PageContent