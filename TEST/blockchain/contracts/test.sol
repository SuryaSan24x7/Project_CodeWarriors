// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";


contract VotingToken is ERC1155, ERC1155Supply, Ownable, ERC1155Burnable {
    constructor() ERC1155("") {
    }

    event NewElectionCreate(uint256 votingId, uint256 tokenId, string position);
    event NewCandidateRegistered(uint256 votingId, string emailId);
    event VotingEnabled(uint256 votingId);
    event VotingDisabled(uint256 votingId);
    event VotingTokenTransfered(uint256 votingId, uint256 tokenId);
    event Voted(uint256 votingId, address candidateAddress);
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIdCounter;

    struct VotingDetails {
        uint256 tokenId;
        string position;
        bool isVotingOpen;
        address[] candidates;
    }
    struct CandidateDetails {
        string candidateName;
        address candidateAddress;
    }
    
    // will store voting Id against Voting details
    mapping(uint256 => VotingDetails) private votingDetails;
    mapping(string => CandidateDetails) private candidateDetails;
    mapping(string => uint256[]) private tokenDistributedToVoters;

    function initiatedNewVoting(uint256 _votingId, string memory _position) public onlyOwner{
        uint256 _tokenId = _tokenIdCounter.current();
        votingDetails[_votingId].tokenId = _tokenId;
        votingDetails[_votingId].position = _position;
        votingDetails[_votingId].isVotingOpen = false;
        _tokenIdCounter.increment();
        
        emit NewElectionCreate(_votingId, _tokenId, _position);
    }
    function registerCandidate(string memory _name, string memory _emailId, address _candidateAddress, uint256 _votingId) public {
        require(_candidateAddress != address(0), 'address zero is not allowed');
        votingDetails[_votingId].candidates.push(_candidateAddress);
        candidateDetails[_emailId].candidateName = _name;
        candidateDetails[_emailId].candidateAddress = _candidateAddress;
        emit NewCandidateRegistered(_votingId, _emailId);
    }
    function disableVoting(uint256 _votingId) public onlyOwner {
        votingDetails[_votingId].isVotingOpen = false;
        emit VotingDisabled(_votingId);
    }
    function enableVoting(uint256 _votingId) public onlyOwner {
        votingDetails[_votingId].isVotingOpen = true;
        emit VotingEnabled(_votingId);
    }
    function requestVotingToken(string memory _emailId, address _to, uint256 _votingId, uint256 _amount, bytes memory _data) public {
        require(votingDetails[_votingId].isVotingOpen == true, 'Voting is not open yet');
        require(isTokenDistributed(_votingId, _emailId ) == false, 'Token has already transferred to Voter');
        uint256 tokenId = votingDetails[_votingId].tokenId;
        _mint(_to, tokenId, _amount, _data);
        tokenDistributedToVoters[_emailId].push(_votingId);
        emit VotingTokenTransfered(_votingId, tokenId);
    }

    function getVotingTokenCount(uint256 _votingId) public view returns (uint256){
        return totalSupply(_votingId);
    }
    function getVotingTokenId(uint256 _votingId) public view returns (uint256){
        return votingDetails[_votingId].tokenId;
    }
    function isTokenDistributed(uint256 _votingId, string memory _emailId) public view returns (bool){
        uint256[] memory ids = tokenDistributedToVoters[_emailId];
        bool status = false;
        for(uint i=0; i< ids.length; i++){
            if(ids[i] == _votingId){
                status = true;
            }
        }
        return status;
    }
    function isCandidateValid(uint256 _votingId, address _candidateAddress) public view returns (bool){
        for(uint i=0; i< votingDetails[_votingId].candidates.length; i++){
            if(_candidateAddress == votingDetails[_votingId].candidates[i]){
                return true;
            }
        }
        return false;
    }
    function vote(uint256 _votingId, address _candidateAddress) public {
        bool isVotingAllowed = votingDetails[_votingId].isVotingOpen;
        uint256 tokenId = votingDetails[_votingId].tokenId;
        require(isVotingAllowed == true, 'Voting is closed');
        require(balanceOf(msg.sender, tokenId) == 1, 'Voter does not have voting token');
        require(isCandidateValid(_votingId,_candidateAddress) == true, 'Candidate is not valid');
        safeTransferFrom(msg.sender, _candidateAddress, tokenId, 1, "");
        emit Voted(_votingId, _candidateAddress);
    }
    // function getOpenVotings() public view {

    // }
    function isVotingOpen(uint256 _votingId) public view returns(bool){
        return votingDetails[_votingId].isVotingOpen;
    }
    // function 
        function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

}
